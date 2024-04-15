import * as path from 'path'
import * as url from 'url'

export function extractFileName(fileUrl: string) {
  const parsedUrl = new url.URL(fileUrl)

  const pathname = parsedUrl.pathname

  return path.basename(pathname)
}
