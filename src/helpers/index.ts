import * as path from 'path'
import * as url from 'url'

export function extractFileName(fileUrl) {
  const parsedUrl = new url.URL(fileUrl)

  const pathname = parsedUrl.pathname

  const filename = path.basename(pathname)
  return filename
}
