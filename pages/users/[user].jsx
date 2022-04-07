import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Restricted from "../../components/Restricted";
import { getSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Post = ({ session }) => {
    const router = useRouter();
    const { user } = router.query;
    const { data: poemdata, error: poemerror } = useSWR(
        `/api/users/${user}/poems`,
        fetcher
    );
    const { data: profiledata, error: profileerror } = useSWR(
        `/api/users/${user}/profile`,
        fetcher
    );
    console.log(poemerror, profileerror, profiledata, poemdata);
    
    if (session?.user && (profiledata?.user !== undefined || profiledata?.user !== null) && poemdata?.poems?.length > 0 && profiledata?.user && poemdata?.poems) {
        return (
            <div>
                <Head>
                    <title>7C Poems</title>
                </Head>
                <Navbar />

                <div className="bg-base-300 p-4 min-h-[100vh] pb-2">
                    <div className="lg:columns-4 md:columns-3 sm:columns-2 gap-2 thingy pb-2">
                        <div className="protection">
                        <div className="card break-inside-avoid-column card-normal bg-base-100 col-span-3 row-span-4 flex-shrink-0 overflow-visible shadow-xl w-100 mb-2 svelte-1n6ue57">
                            <figure className="px-10 pt-10">
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={profiledata.user.image} />
                                    </div>
                                </div>
                            </figure>

                            <div className="card-body place-items-center items-center text-center">
                                <h2 className="card-title">{profiledata.user.name}</h2>
                                <p className="text-base-content text-md">
                                    {profiledata.user.email}
                                </p>
                                <p className="text-sm text-opacity-80 text-base-content">
                                    Has{" "}
                                    <span className="font-bold">
                                        {poemdata.poems.length}
                                    </span>{" "}
                                    poem{poemdata.poems.length == 1 ? "" : "s"}.
                                </p>
                            </div>
                        </div>
                        </div>
                        {poemdata.poems.map((ite, i) => {
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
                                            <p>By {profiledata.user.name}</p>
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
                </div>

                <Footer />
            </div>
        );
    } else if (profiledata == undefined || poemdata == undefined) {
        return (
            <div>
                <Head>
                        <title>7C Poems</title>
                    </Head>
                    <Navbar />
            <div className="bg-base-300 p-4 min-h-[100vh] pb-2">
                <div className="lg:columns-4 md:columns-3 sm:columns-2 gap-2 thingy pb-2">
                    <div className="protection">
                    <div className="card break-inside-avoid-column card-normal bg-base-100 col-span-3 row-span-4 flex-shrink-0 overflow-visible shadow-xl w-100 mb-2 svelte-1n6ue57">
                        <figure className="px-10 pt-10">
                            <div className="avatar">
                                <div className="w-24 rounded-full animate-pulse bg-neutral">
                                    
                                </div>
                            </div>
                        </figure>
    
                        <div className="card-body place-items-center items-center text-center">
                            <div class="w-36 bg-neutral h-6 rounded-md animate-pulse"></div>
                            <p className="text-base-content text-md">
                            <div class="w-24 bg-neutral h-6 rounded-md animate-pulse"></div>
                            </p>
                            <p className="text-sm text-opacity-80 text-base-content">
                            <div class="w-24 bg-neutral h-6 rounded-md animate-pulse"></div>
                            </p>
                        </div>
                    </div>
                    </div>
                    {[0,1,2,3,4,5,6,7,8,9,10].map((ite, i) => {
                        return (
                            <div
                                className="protection"
                                key={i}
                            >
                                <div className="card break-inside-avoid-column w-100 bg-base-200 shadow-xl mb-2">
                                    <div className="card-body">
                                        <h2 className="card-title">
                                        <div class="w-60 bg-neutral h-6 rounded-md animate-pulse"></div>
                                        </h2>
                                        <div class="w-40 bg-neutral h-6 rounded-md animate-pulse"></div>
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
    } else if (profileerror) {
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
    } else if (profiledata.user == null) {
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
            session: sess,
        },
    };
}
