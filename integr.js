import { symlink, unlink, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export default function integr () {
    return {
        name: "test integr",
        hooks: {
            'astro:config:setup': async ({config}) => {
                const url = fileURLToPath(path.dirname(import.meta.url))
                const origin = path.join(url, 'src', `${config.output}-pages`)
                const destination = path.join(url, 'src', 'pages')

                try {
                    await access(destination)
                    await unlink(destination)
                } catch {

                } finally {
                    await symlink(origin, destination)
                }
            }
        }
    }
}