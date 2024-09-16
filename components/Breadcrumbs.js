// components/Breadcrumbs.js
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Breadcrumbs() {
  const router = useRouter();
  const { pathname } = router;

  // break path into segments
  const pathSegments = pathname.split('/').filter((segment) => segment);

  return (
    <nav >
      <ol className="breadcrumb">
        
        <li className="breadcrumb-item">
          <Link href="/">Home</Link>
        </li>

          
        {pathSegments.map((segment, index) => {
          // path for each segment
          const segmentPath = '/' + pathSegments.slice(0, index + 1).join('/');

          // last segment check?
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={segmentPath} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
              {isLast ? (
                segment
              ) : (
                <Link href={segmentPath}>{segment}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}