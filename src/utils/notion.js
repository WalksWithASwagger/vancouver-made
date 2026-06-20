import { Client } from '@notionhq/client'

let notionClient = null

export function initNotionClient(apiKey) {
  if (!apiKey) {
    throw new Error('VITE_NOTION_API_KEY is not set in .env.local')
  }
  notionClient = new Client({ auth: apiKey })
  return notionClient
}

export function getNotionClient() {
  if (!notionClient) {
    throw new Error('Notion client not initialized. Call initNotionClient first.')
  }
  return notionClient
}

// Fetch all prompts from the Prompts database
export async function getPrompts(databaseId, concept = null, batch = null) {
  const client = getNotionClient()

  const filter = {
    and: [
      ...(concept ? [{ property: 'Concept', select: { equals: concept } }] : []),
      ...(batch ? [{ property: 'Batch', select: { equals: batch } }] : [])
    ]
  }

  try {
    const response = await client.databases.query({
      database_id: databaseId,
      ...(concept || batch ? { filter } : {})
    })

    return response.results.map(page => ({
      id: page.id,
      promptId: page.properties.PromptId?.rich_text?.[0]?.plain_text,
      name: page.properties.Name?.title?.[0]?.plain_text,
      promptText: page.properties.PromptText?.rich_text?.[0]?.plain_text || page.properties.Name?.title?.[0]?.plain_text,
      concept: page.properties.Concept?.select?.name,
      batch: page.properties.Batch?.select?.name,
      status: page.properties.Status?.select?.name,
      category: page.properties.Category?.select?.name
    }))
  } catch (err) {
    console.error('Error fetching prompts from Notion:', err)
    return []
  }
}

// Fetch a single prompt by ID
export async function getPromptById(databaseId, promptId) {
  const client = getNotionClient()

  try {
    const response = await client.databases.query({
      database_id: databaseId,
      filter: {
        property: 'PromptId',
        rich_text: { equals: promptId }
      }
    })

    if (response.results.length === 0) return null

    const page = response.results[0]
    return {
      id: page.id,
      promptId: page.properties.PromptId?.rich_text?.[0]?.plain_text,
      name: page.properties.Name?.title?.[0]?.plain_text,
      promptText: page.properties.PromptText?.rich_text?.[0]?.plain_text,
      concept: page.properties.Concept?.select?.name,
      batch: page.properties.Batch?.select?.name,
      status: page.properties.Status?.select?.name
    }
  } catch (err) {
    console.error('Error fetching prompt from Notion:', err)
    return null
  }
}

// Create a new rating in the Ratings database
export async function createRating(databaseId, rating) {
  const client = getNotionClient()

  try {
    const response = await client.pages.create({
      parent: { database_id: databaseId },
      properties: {
        AssetId: {
          title: [{ text: { content: rating.assetId } }]
        },
        Score: {
          number: rating.score || null
        },
        Liked: {
          checkbox: rating.liked || false
        },
        Notes: {
          rich_text: [{ text: { content: rating.notes || '' } }]
        }
      }
    })

    return response.id
  } catch (err) {
    console.error('Error creating rating in Notion:', err)
    return null
  }
}

// Update a rating in Notion
export async function updateRating(pageId, rating) {
  const client = getNotionClient()

  try {
    await client.pages.update({
      page_id: pageId,
      properties: {
        Score: {
          number: rating.score || null
        },
        Liked: {
          checkbox: rating.liked || false
        },
        Notes: {
          rich_text: [{ text: { content: rating.notes || '' } }]
        }
      }
    })

    return true
  } catch (err) {
    console.error('Error updating rating in Notion:', err)
    return false
  }
}

// Get distinct concepts from Prompts database
export async function getConcepts(databaseId) {
  const prompts = await getPrompts(databaseId)
  const concepts = [...new Set(prompts.map(p => p.concept).filter(Boolean))]
  return concepts.sort()
}

// Get distinct batches for a concept
export async function getBatches(databaseId, concept) {
  const prompts = await getPrompts(databaseId, concept)
  const batches = [...new Set(prompts.map(p => p.batch).filter(Boolean))]
  return batches.sort()
}
