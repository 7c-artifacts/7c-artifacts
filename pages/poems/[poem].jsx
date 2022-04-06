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
    const { poem } = router.query;
    const { data: poemdata, error } = useSWR(
        `/api/poems/${poem}`,
        fetcher
    );

    
    if (session?.user && (poemdata?.poem !== undefined || poemdata?.poem !== null) && poemdata?.poem) {
        console.log(poemdata);
        return (
            <div>
                <Head>
                    <title>7C Poems</title>
                </Head>
                <Navbar />
                <div className="output p-4 min-h-[100vh] bg-base-200" style={{
                    maxWidth: "none !important",
                    overflowWrap: "break-word"
                }}>
                <h1>{poemdata.poem.title}</h1>
                    <h2 className="mb-2">By <a className="link" href={"/users/" + poemdata.poem.user.id}>{poemdata.poem.user.name}</a></h2>
                    <div className="mb-2">
                    {poemdata.poem.tags.map((val, i) => {
                        console.log(val);
                        return (
                        <div className="badge badge-primary mr-3" key={i}>{val.text}</div>
                        );
                    })}
                    </div>
                    <div dangerouslySetInnerHTML={{__html: poemdata.poem.text}} className="mt-3 thing">
                    </div>
                </div>
                

                <Footer />
            </div>
        );
    } else if (poemdata == undefined) {
        return (
            <div>
                <Head>
                        <title>7C Poems</title>
                    </Head>
                    <Navbar />
            <div className="p-4 min-h-[100vh] bg-base-200">
            <div class="w-[40vw] bg-neutral h-[67px] mt-[10px] mb-[10px] rounded-md animate-pulse"></div>
            <div class="w-[25vw] bg-neutral h-[32px] mb-[18px] rounded-md animate-pulse"></div>
            <div class="w-[95%] bg-neutral h-[18px] mt-[12px] mb-[6px] rounded-md animate-pulse"></div>
            <div class="w-[97%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
            <div class="w-[87%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
            <div class="w-[94%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
            <div class="w-[93%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
            <div class="w-[47%] bg-neutral h-[18px] mb-[18px] rounded-md animate-pulse"></div>
            <div class="w-[93%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
            <div class="w-[89%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
            <div class="w-[97%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
            <div class="w-[95%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
            <div class="w-[63%] bg-neutral h-[18px] mb-[18px] rounded-md animate-pulse"></div>

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
    } else if (poemdata?.poem == null) {
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
                                That poem doesn&apos;t exist.
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
