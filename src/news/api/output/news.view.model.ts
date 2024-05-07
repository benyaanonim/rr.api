import { News } from '../../domain/news.entity'
import { Tag } from '../../../tag/domain/tag.entity'
import { Category } from '../../../category/domain/category.entity'
import { Source } from '../../domain/source.entity'
import { ApiProperty } from '@nestjs/swagger'

export class TagViewModel {
  @ApiProperty({ example: 1, description: 'Tag id' })
  id: number
  @ApiProperty({ example: 'This is tag name', description: 'Tag name' })
  name: string
  @ApiProperty({ example: 'https://www.saite.com', description: 'Tag link' })
  link: string
  constructor(tag: Tag) {
    this.id = tag.id
    this.name = tag.name
    this.link = tag.link
  }
}

export class SourceViewModel {
  @ApiProperty({ example: 1, description: 'Source id' })
  id: number
  @ApiProperty({ example: 'This is source name', description: 'Source name' })
  name: string
  @ApiProperty({ example: 'This is source value', description: 'Source value' })
  value: string
  constructor(source: Source) {
    this.id = source.id
    this.name = source.name
    this.value = source.value
  }
}

export class CategoryViewModel {
  @ApiProperty({ example: 1, description: 'Category id' })
  id: number
  @ApiProperty({ example: 'This is category name', description: 'Category name' })
  name: string
  constructor(category: Category) {
    this.id = category.id
    this.name = category.name
  }
}
export class NewsViewModel {
  @ApiProperty({ example: 1, description: 'ID of the news' })
  id: number

  @ApiProperty({ example: 'Breaking News!', description: 'Title of the news' })
  title: string

  @ApiProperty({ example: 'Here is some news text.', description: 'Text content of the news' })
  text: string

  @ApiProperty({ example: 150, description: 'View count of the news' })
  viewCount: number

  @ApiProperty({ example: 'https://example.com/news-image.jpg', description: 'Image URL of the news' })
  image: string

  @ApiProperty({ example: '2024-04-15T08:03:28.005Z', description: 'Publication date of the news' })
  publicationDate: string

  @ApiProperty({ type: CategoryViewModel, description: 'Category of the news' })
  category?: CategoryViewModel | null

  @ApiProperty({ type: [TagViewModel], description: 'Tags associated with the news' })
  tags?: TagViewModel[] | null

  @ApiProperty({ type: [SourceViewModel], description: 'Sources of the news' })
  sources?: SourceViewModel[] | null
  constructor(news: News) {
    this.id = news.id
    this.title = news.title
    this.text = news.text
    this.viewCount = news.viewCount
    this.image = news.image
    this.publicationDate = news.publicationDate.toLocaleString('ru-RU')

    if (news.category) {
      this.category = new CategoryViewModel(news.category)
    } else {
      this.category = null
    }

    if (news.tags && news.tags.length > 0) {
      this.tags = news.tags.map((t) => new TagViewModel(t))
    } else {
      this.tags = null
    }

    if (news.sources && news.sources.length > 0) {
      this.sources = news.sources.map((s) => new SourceViewModel(s))
    } else {
      this.sources = null
    }
  }
}
