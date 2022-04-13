import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Restricted from "../../components/Restricted";
import { getSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";
import Link from "next/link";
import { titleCase } from "title-case";

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
const fetcher = (url) => fetch(url).then((res) => res.json());

const Post = ({ session }) => {
    const router = useRouter();
    const { tag } = router.query;
    const { data: tagdata, error } = useSWR(`/api/tags/${tag}`, fetcher);
    let namething = <></>;
    if (tagdata?.tag?.poems?.length > 0) {
        namething = (<>First used on{" "}
        {parseISOString(
            tagdata.tag.createdAt
        ).toLocaleString()}{" "}
        by{" "}
        {
            tagdata.tag.poems[
                tagdata.tag.poems.length - 1
            ].user.name
        }</>)
    } 
    if (
        session?.user &&
        (tagdata?.tag !== undefined || tagdata?.tag !== null) &&
        tagdata?.tag
    ) {
        console.log(tagdata);
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
                                <div className="card-body place-items-center items-center text-center">
                                    <h2 className="card-title">
                                        {titleCase(tagdata.tag.name)}
                                    </h2>
                                    <p className="text-base-content text-md">
                                        Has{" "}
                                        <span className="font-bold">
                                            {tagdata.tag.poems.length}
                                        </span>{" "}
                                        poem
                                        {tagdata.tag.poems.length == 1
                                            ? ""
                                            : "s"}
                                        .
                                    </p>
                                    <p className="text-sm text-opacity-80 text-base-content">
                                        
                                        {namething}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {tagdata.tag.poems.map((ite, i) => {
                            return (
                                <div className="protection" key={i}>
                                    <div className="card break-inside-avoid-column w-100 bg-base-200 shadow-xl mb-2">
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {ite.title}
                                            </h2>
                                            <p>By <Link href={`/users/${ite.userId}`} passHref><a className="link" target="_blank" rel="noopener noreferrer">{ite.user.name}</a></Link></p>
                                            <div className="card-actions justify-end mt-2 gap-0">
                                                {ite.tags.map((ite2, i) => {
                                                    return (
                                                        <div className="badge badge-outline"
                                                        style={{
                                                            margin: "2px",
                                                        }}
                                                        key={ite2.id}>
                                                        <Link
                                                            passHref
                                                            href={`/tags/${ite2.id}`}
                                                        >
                                                            <a>
                                                                {ite2.name}
                                                            </a>
                                                        </Link>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="card-actions justify-end mt-2">
                                                
                                                <Link
                                                    href={"/poems/" + ite.id}
                                                    passHref
                                                >
                                                    <a target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-sm">Go to Poem</a>

                                                </Link>
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
    } else if (tagdata == undefined) {
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
                                <div className="card-body place-items-center items-center text-center">
                                    <div className="w-36 bg-neutral h-6 rounded-md animate-pulse mb-[20px]"></div>
                                    <p className="text-base-content text-md">
                                        <div className="w-24 bg-neutral h-6 rounded-md animate-pulse"></div>
                                    </p>
                                    <p className="text-sm text-opacity-80 text-base-content">
                                        <div className="w-24 bg-neutral h-6 rounded-md animate-pulse"></div>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ite, i) => {
                            return (
                                <div className="protection" key={i}>
                                    <div className="card break-inside-avoid-column w-100 bg-base-200 shadow-xl mb-2">
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                <div className="w-60 bg-neutral h-6 rounded-md animate-pulse"></div>
                                            </h2>
                                            <div className="w-40 bg-neutral h-6 rounded-md animate-pulse"></div>
                                            <div className="card-actions justify-end mt-2 gap-0">
                                                {[1, 2, 3].map((ite2, i) => {
                                                    return (
                                                        <div
                                                            className="badge w-12 bg-neutral h-6 animate-pulse"
                                                            style={{
                                                                margin: "2px",
                                                            }}
                                                            key={i}
                                                        ></div>
                                                    );
                                                })}
                                            </div>
                                            <div className="card-actions justify-end mt-2">
                                                <a className="btn btn-sm w-24 h-6 rounded-md bg-neutral animate-pulse"></a>
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
                            <p className="py-6">Sorry! Check console.</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    } else if (tagdata?.tag == null) {
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
                            <p className="py-6">That tag doesn&apos;t exist.</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    } else {
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
