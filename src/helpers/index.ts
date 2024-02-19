import { Stream } from 'stream';
import url from 'url';
import path from 'path';

export async function stream2buffer(stream: Stream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();

    stream.on('data', (chunk) => _buf.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', (err) => reject(`error converting stream - ${err}`));
  });
}

export function extractFileName(fileUrl) {
  const parsedUrl = new url.URL(fileUrl);

  const pathname = parsedUrl.pathname;

  const filename = path.basename(pathname);
  return filename;
}
