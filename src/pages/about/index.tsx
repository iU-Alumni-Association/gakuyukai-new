import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import { getBlogsByCategory } from '@/lib/microcms';
import BlogItem from '@/components/BlogItem';
import LoadingBar from '@/components/LoadingBar';
import { Blog } from '@/lib/types';

const AboutPage = () => {
  const [committees, setCommittees] = useState<
    Blog[]
  >([]);
  const [circles, setCircles] = useState<Blog[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch Committee Information
    const fetchCommittees = async () => {
      setLoading(true);
      try {
        const committeeData =
          await getBlogsByCategory(
            'committee',
            1,
            5,
          );
        setCommittees(committeeData.contents);
      } catch (error) {
        console.error(
          'Error fetching committee data:',
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    // Fetch Circle Information
    const fetchCircles = async () => {
      setLoading(true);
      try {
        const circleData =
          await getBlogsByCategory(
            'circle',
            1,
            5,
          );
        setCircles(circleData.contents);
      } catch (error) {
        console.error(
          'Error fetching circle data:',
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCommittees();
    fetchCircles();
  }, []);

  return (
    <>
      <Meta
        title="iU GAKUYUKAI | 学友会について"
        description="学友会の活動、委員会、サークルについての情報を提供しています。"
      />
      <Header />
      <Breadcrumbs />
      <LoadingBar loading={loading} />
      <main className="bg-neutral-background py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-brand-dark mb-12 text-center text-h1 font-bold sm:text-h1Sm">
            学友会について
          </h1>

          {/* Committees Section */}
          <section className="mb-12">
            <h2 className="text-brand-dark mb-6 text-h2 font-semibold sm:text-h2Sm">
              活動中の委員会
            </h2>
            {committees.length === 0 ?
              <p className="text-neutral-paragraph text-p sm:text-pSm">
                委員会情報は現在準備中です。もうしばらくお待ちください。
              </p>
            : <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {committees.map((committee) => (
                  <BlogItem
                    key={committee.id}
                    blog={committee}
                  />
                ))}
              </ul>
            }
          </section>

          {/* Circles Section */}
          <section>
            <h2 className="text-brand-dark mb-6 text-h2 font-semibold sm:text-h2Sm">
              活動中のサークル
            </h2>
            {circles.length === 0 ?
              <p className="text-neutral-paragraph text-p sm:text-pSm">
                サークル情報は現在準備中です。もうしばらくお待ちください。
              </p>
            : <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {circles.map((circle) => (
                  <BlogItem
                    key={circle.id}
                    blog={circle}
                  />
                ))}
              </ul>
            }
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
