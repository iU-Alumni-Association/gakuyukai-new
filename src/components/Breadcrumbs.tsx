import { useRouter } from 'next/router';
import Link from 'next/link';

/**
 * Breadcrumbs component to display the current
 * page path. Designed to appear below the header
 * with a gray background.
 */
const Breadcrumbs = () => {
  const router = useRouter();

  // Split the current path into segments and create breadcrumbs.
  const pathSegments = router.asPath
    .split('/')
    .filter((segment) => segment);

  return (
    <div className="border-radius mx-10 mt-24 rounded-full bg-gray-200 py-2 sm:mx-4">
      <div className="container mx-auto px-4">
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap space-x-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="hover:underline"
              >
                home
              </Link>
            </li>
            {pathSegments.map(
              (segment, index) => {
                const href =
                  '/' +
                  pathSegments
                    .slice(0, index + 1)
                    .join('/');
                const isLast =
                  index ===
                  pathSegments.length - 1;

                return (
                  <li
                    key={href}
                    className="flex items-center"
                  >
                    <span className="mx-2">
                      {' '}
                      &gt;{' '}
                    </span>
                    {isLast ?
                      <span>{segment}</span>
                    : <Link
                        href={href}
                        className="hover:underline"
                      >
                        {segment}
                      </Link>
                    }
                  </li>
                );
              },
            )}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
