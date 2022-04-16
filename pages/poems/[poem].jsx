import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Restricted from "../../components/Restricted";
import { getSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";
import Link from "next/link";
import dynamic from "next/dynamic";

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
const fetcher = (url) => fetch(url).then((res) => res.json());

const Editor = dynamic(
    () => { return import('react-draft-wysiwyg').then(mod => mod.Editor) },
    { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

const Post = ({ session }) => {
    const router = useRouter();
    const { poem } = router.query;
    const { data: poemdata, error } = useSWR(`/api/poems/${poem}`, fetcher);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [htmlData, setHtmlData] = useState("");

    function onChange(k) {
        setEditorState(k);
        var data = stateToHTML(k.getCurrentContent());
        setHtmlData(data);
        localStorage.setItem("7cpoems-submit-editor-data", data);
    }

    const handlePastedText = (text, html, editorState) => {
        if (html) {
            const blocksFromHTML = Draft.convertFromHTML(html.replace(/<b/g, '<p').replace(/<\/b/, '</p'));
            let contentState = Modifier.replaceWithFragment(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap).getBlockMap()
            )

            onChange(EditorState.push(editorState, contentState, 'insert-fragment'))
            return true;
        } else {
            return false;
        }
    };


    if (
        session?.user &&
        (poemdata?.poem !== undefined || poemdata?.poem !== null) &&
        poemdata?.poem
    ) {
        console.log(poemdata);
        return (
            <div>
                <Head>
                    <title>7C Poems</title>
                </Head>
                <Navbar />
                <div
                    className="output p-4 min-h-[100vh] bg-base-200"
                    style={{
                        maxWidth: "none !important",
                        overflowWrap: "break-word",
                    }}
                >
                    <h1>{poemdata.poem.title}</h1>

                    <h2 className="mb-2">
                        By{" "}
                        <Link href={`/users/${poemdata.poem.user.id}`} passHref>
                            <a
                                className="link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {poemdata.poem.user.name}
                            </a>
                        </Link>
                    </h2>
                    <h4 className="mb-2">
                        Published on{" "}
                        {parseISOString(
                            poemdata.poem.createdAt
                        ).toLocaleString()}
                    </h4>
                    <div className="mb-2">
                        {poemdata.poem.tags.map((val, i) => {
                            console.log(val);
                            return (
                                <div
                                    className="badge badge-primary mr-3"
                                    key={i}
                                >
                                    <Link passHref href={`/tags/${val.id}`}>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ignoreLink"
                                        >
                                            {val.name}
                                        </a>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: poemdata.poem.text }}
                        className="mt-3 thing"
                    ></div>
                    <br />
                    <h1>Comments</h1>
                    <div className="comments">
                        <div className="card w-100 bg-base-100 shadow-xl mb-4 overflow-visible">
                            <div className="card-body">
                                <h2 className="card-title mb-2">Submit a Comment</h2>
                                <Editor editorState={editorState} handlePastedText={handlePastedText} onEditorStateChange={onChange} toolbar={{
                                    options: ['inline', 'list', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                                    inline: {
                                        options: ['bold', 'italic', 'underline', 'strikethrough'],
                                    }
                                }} />
                                <div className="card-actions justify-end mt-2">
                                    <button className="btn btn-primary">Post</button>
                                </div>
                            </div>

                        </div>

                        <div className="card w-100 bg-base-100 shadow-xl mb-4">
                            <div className="card-body">
                                <h2 className="card-title"><div className="avatar">
                                    <div className="w-8 rounded-full">
                                        <img src="https://lh3.googleusercontent.com/a-/AOh14GglVHH-jcg2QCNX7Ukc_-DfNpjC6FPL9vz4oSFDwg=s96-c" />
                                    </div>
                                </div>Anvay Mathur</h2>
                                <p className="whitespace-pre-wrap" style={{ overflowWrap: "break-word", }}>{`Hm. Interesting idea. I think this could go somewhere... How about x? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed tristique nulla. Vivamus varius euismod ipsum, nec eleifend nulla porttitor sit amet. Nam at commodo felis. Cras ultrices, eros non consectetur ullamcorper, tortor mauris facilisis nulla, vitae tempor est elit id nulla. Sed quis dui non odio molestie sagittis id eget lectus. Curabitur sit amet nulla suscipit, tempus orci a, vestibulum elit. Vivamus neque nisi, eleifend vitae molestie a, dapibus quis erat. Aliquam sit amet tempus sem, ac vestibulum eros. Aenean a lobortis ex.

Nulla euismod diam tortor. Morbi tristique fermentum dolor eu tristique. Nunc interdum dapibus ullamcorper. Quisque eget leo at lacus scelerisque accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce pharetra elementum sapien non imperdiet. Vivamus venenatis, quam ac malesuada aliquet, nibh turpis iaculis purus, placerat posuere libero lacus vel ante. Duis non ornare odio. In hac habitasse platea dictumst. Quisque sed nibh ipsum. Morbi congue sem non feugiat pretium. Aliquam facilisis porta felis non rhoncus.`}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <Footer />
            </div>
        );
        // I hate css
    } else if (poemdata == undefined) {
        return (
            <div>
                <Head>
                    <title>7C Poems</title>
                </Head>
                <Navbar />
                <div className="p-4 min-h-[100vh] bg-base-200">
                    <div className="w-[40vw] bg-neutral h-[67px] mt-[10px] mb-[10px] rounded-md animate-pulse"></div>
                    <div className="w-[25vw] bg-neutral h-[32px] mb-[10px] rounded-md animate-pulse"></div>
                    <div className="w-[16vw] bg-neutral h-[26px] mb-[5px] rounded-md animate-pulse"></div>
                    {[1, 2, 3].map((ite2, i) => {
                        return (
                            <div
                                className="badge w-24 bg-neutral h-6 animate-pulse"
                                style={{
                                    margin: "3px",
                                }}
                                key={i}
                            ></div>
                        );
                    })}
                    <div className="w-[95%] bg-neutral h-[18px] mt-[12px] mb-[6px] rounded-md animate-pulse"></div>
                    <div className="w-[97%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
                    <div className="w-[87%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
                    <div className="w-[94%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
                    <div className="w-[93%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
                    <div className="w-[47%] bg-neutral h-[18px] mb-[18px] rounded-md animate-pulse"></div>
                    <div className="w-[93%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
                    <div className="w-[89%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
                    <div className="w-[97%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
                    <div className="w-[95%] bg-neutral h-[18px] mb-[6px] rounded-md animate-pulse"></div>
                    <div className="w-[63%] bg-neutral h-[18px] mb-[18px] rounded-md animate-pulse"></div>
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
