import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Restricted from "../../components/Restricted";
import { getSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";
import Link from "next/link";
import dynamic from "next/dynamic";
import { sanitize } from "../../components/purify";

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
const fetcher = (url) => fetch(url).then((res) => res.json());

const Editor = dynamic(
    () => {
        return import("react-draft-wysiwyg").then((mod) => mod.Editor);
    },
    { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import Names from "../../components/Names";

const Post = ({ session }) => {
    const router = useRouter();
    function html(k) {
        return stateToHTML(k.getCurrentContent(), {
            blockRenderers: {
                atomic: (block) => {
                    let key = block.getEntityAt(0);
                    let type = k.getCurrentContent().getEntity(key).type;
                    if (type === "EMBEDDED_LINK") {
                        console.log("embedded link");
                        let data = k
                            .getCurrentContent()
                            .getEntity(key)
                            .getData();
                        console.log(data);
                        return (
                            "<div><iframe src=" +
                            data.src +
                            ' height="' +
                            data.height +
                            '" width="' +
                            data.width +
                            '" frameborder="0" allow="encrypted-media" allowfullscreen></iframe></div>'
                        );
                    }
                },
            },
        });
    }
    const { poem } = router.query;
    const { data: poemdata, error } = useSWR(`/api/poems/${poem}`, fetcher);
    const { data: comments, error: commenterror } = useSWR(
        `/api/poems/${poem}/comments`,
        fetcher
    );
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [cError, setCError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [htmlData, setHtmlData] = useState("");

    function onChange(k) {
        setEditorState(k);
        var data = html(k);
        setHtmlData(data);
        // localStorage.setItem("7cpoems-submit-editor-data", data);
    }

    const handlePastedText = (text, html, editorState) => {
        if (html) {
            const blocksFromHTML = Draft.convertFromHTML(
                html.replace(/<b/g, "<p").replace(/<\/b/, "</p")
            );
            let contentState = Modifier.replaceWithFragment(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap
                ).getBlockMap()
            );

            onChange(
                EditorState.push(editorState, contentState, "insert-fragment")
            );
            return true;
        } else {
            return false;
        }
    };
    function commentSubmit() {
        setCError(null);
        setSubmitting(true);
        fetch("/api/poems/" + poemdata.poem.id + "/comment", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: htmlData,
            }),
        })
            .then((result) => result.json())
            .then((json) => {
                if (json.error) {
                    setCError(json.error.join("<br />"));
                } else {
                    setCError(null);
                    router.reload();
                }
                console.log(json);
                setSubmitting(false);
            })
            .catch((err) => {
                setCError(err);
                setSubmitting(false);
            });
    }

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
                    <Names users={poemdata.poem.users} withoutP={true} />
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
                        dangerouslySetInnerHTML={{
                            __html: sanitize(poemdata.poem.text, {
                                ADD_TAGS: ["iframe"],
                            }),
                        }}
                        className="mt-3 thing"
                    ></div>
                    <br />
                    <h1>Comments</h1>
                    <div className="comments">
                        <div className="card w-100 bg-base-100 shadow-xl mb-4 overflow-visible">
                            <div className="card-body">
                                <h2 className="card-title mb-2">
                                    Submit a Comment
                                </h2>
                                <Editor
                                    editorState={editorState}
                                    handlePastedText={handlePastedText}
                                    onEditorStateChange={onChange}
                                    toolbar={{
                                        options: [
                                            "inline",
                                            "list",
                                            "link",
                                            "embedded",
                                            "image",
                                            "remove",
                                            "history",
                                        ],
                                        inline: {
                                            options: [
                                                "bold",
                                                "italic",
                                                "underline",
                                                "strikethrough",
                                            ],
                                        },
                                    }}
                                />
                                {cError !== null ? (
                                    <div className="alert alert-error shadow-lg mt-3">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="stroke-current flex-shrink-0 h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span>
                                                Error!{" "}
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: cError,
                                                    }}
                                                ></span>
                                            </span>
                                        </div>
                                    </div>
                                ) : null}
                                <div className="card-actions justify-end mt-2">
                                    <button
                                        className={
                                            "btn btn-primary" +
                                            (submitting ? " loading" : "")
                                        }
                                        {...(submitting
                                            ? { disabled: true }
                                            : { disabled: false })}
                                        onClick={commentSubmit}
                                    >
                                        {submitting ? "Posting..." : "Post"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {comments
                            ? comments.comments.map((val) => {
                                  return (
                                      <div className="card w-100 bg-base-100 shadow-xl mb-4" key={val.id}>
                                          <div className="card-body">
                                              <h2 className="card-title">
                                                  <div className="avatar">
                                                      <div className="w-8 rounded-full">
                                                          <img
                                                              src={
                                                                  val.user.image
                                                              }
                                                          />
                                                      </div>
                                                  </div>
                                                  {val.user.name}
                                              </h2>
                                              <h5 className="font-light">
                                                  At{" "}
                                                  {parseISOString(
                                                      val.createdAt
                                                  ).toLocaleString()}
                                              </h5>
                                              <div
                                                  className="whitespace-pre-wrap"
                                                  style={{
                                                      overflowWrap:
                                                          "break-word",
                                                  }}
                                                  dangerouslySetInnerHTML={{
                                                      __html: sanitize(
                                                          val.text,
                                                          {
                                                              ADD_TAGS: [
                                                                  "iframe",
                                                              ],
                                                          }
                                                      ),
                                                  }}
                                              ></div>
                                          </div>
                                      </div>
                                  );
                              })
                            : null}
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
