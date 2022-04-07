import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Restricted from '../../components/Restricted';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import useSWRInfinite from 'swr/infinite';

const fetcher = url => fetch(url).then(res => res.json());

const Post = ({ session }) => {
	const router = useRouter();
	const { user } = router.query;
	const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite(
        (index) => {
            return `/api/poems?p=${index + 1}`;
        }, fetcher
	);
    const poems = undefined;
    console.log("DATA", data);
    if (data) {
        poems = {poems: []};
        for (let i = 0; i < data.length; i++) {
            poems.count = data[i].poems.count
            for (let j = 0; j < data[i].poems.rows.length; j++) {
                poems.poems.push(data[i].poems.rows[j]);
            }
        }
        
    }
    console.log("POEMS", poems);
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
      isLoadingInitialData ||
      (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
	if (
		session?.user && (poems?.poems !== undefined || poems?.poems !== null) && poems?.poems
	) {
		return (
			<div>
				<Head>
					<title>7C Poems</title>
				</Head>
				<Navbar />
                <div className="bg-base-300 p-4 min-h-[100vh] pb-2">
                <h1 className="text-5xl mb-2">Poems</h1>
                <div className="lg:columns-4 md:columns-3 sm:columns-2 gap-2 thingy pb-2">
                        {poems.poems.map((ite, i) => {
                            console.log(ite);
                            return (
                                <div
                                    className="protection"
                                    key={i}
                                >
                                    <div className="card break-inside-avoid-column w-100 bg-base-200 shadow-xl mb-2">
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {ite.title}
                                            </h2>
                                            <p>By {ite.user.name}</p>
                                            <div className="card-actions justify-end mt-2 gap-0">
                                                {ite.tags.map((ite2, i) => {
                                                    return (
                                                        <div
                                                            className="badge badge-outline"
                                                            style={{
                                                                margin: "2px",
                                                            }}
                                                            key={i}
                                                        >
                                                            {ite2.name}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="card-actions justify-end mt-2">
                                                <a
                                                    href={"/poems/" + ite.id}
                                                    target="_blank"
                                                    className="btn btn-sm"
                                                >
                                                    Go to Poem
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button
          disabled={isLoadingMore || isRefreshing || poems.poems.length >= Number(poems.count)}
          className={"btn btn-primary" + (isLoadingMore ? " loading" : "")}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore ? "Loading..." : (poems.poems.length >= Number(poems.count) ? "No more poems" : (isRefreshing ? "Refreshing..." : "Load more"))}
        </button>
                    </div>
                <Footer />
            </div>
        );
    
    } else if (poems == undefined) {
        return (
            <div>
                <Head>
                        <title>7C Poems</title>
                    </Head>
                    <Navbar />
            <div className="bg-base-300 p-4 min-h-[100vh] pb-2">
            <h1 className="text-5xl mb-2">Poems</h1>
                <div className="lg:columns-4 md:columns-3 sm:columns-2 gap-2 thingy pb-2">
                    
                    {[0,1,2,3,4,5,6].map((ite, i) => {
                        return (
                            <div
                                className="protection"
                                key={i}
                            >
                                <div className="card break-inside-avoid-column w-100 bg-base-200 shadow-xl mb-2">
                                    <div className="card-body">
                                        <h2 className="card-title">
                                        <div className="w-60 bg-neutral h-6 rounded-md animate-pulse"></div>
                                        </h2>
                                        <div className="w-40 bg-neutral h-6 rounded-md animate-pulse"></div>
                                        <div className="card-actions justify-end mt-2 gap-0">
                                            {[1,2,3].map((ite2, i) => {
                                                return (
                                                    <div
                                                        className="badge w-12 bg-neutral h-6 rounded-md animate-pulse"
                                                        style={{
                                                            margin: "2px",
                                                        }}
                                                        key={i}
                                                    >
                                                        
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="card-actions justify-end mt-2">
                                            <a
                                                
                                                className="btn btn-sm w-24 h-6 rounded-md bg-neutral animate-pulse"
                                            >
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
            </div>
        )
    } else if (error) {
        return (
            <div>
                <Head>
                    <title>7C Poems</title>
                </Head>
                <Navbar />
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Error.</h1>
                            <p className="py-6">
                                Sorry! Check console.
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    } else if (poems.poems == null || poems.poems.length <= 0) {
        console.log(poems);
        return (
            <div>
                <Head>
                    <title>7C Poems</title>
                </Head>
                <Navbar />
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Sorry.</h1>
                            <p className="py-6">
                                That user doesn&apos;t exist.
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    else {
        return (
            <div>
                <Head>
                    <title>7C Poems</title>
                </Head>
                <Navbar session={session} />
                <Restricted />
                <Footer />
            </div>
        );
    }
};

export default Post;

export async function getServerSideProps(context) {
	const sess = await getSession(context);

	return {
		props: {
			session: sess
		}
	};
}
