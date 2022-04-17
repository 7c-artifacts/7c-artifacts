{
    /* <Link href={`/users/${poemdata.poem.user.id}`} passHref>
                            <a
                                className="link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {poemdata.poem.users.map(user => user.name).join(", ")}
                            </a>
                        </Link> */
}

import Link from "next/link";

function Names(props) {
    if (props.withoutP) {
        return (
            <>
                {props.by ? props.by : "By"} {props.users.map((user) => <Link href={`/users/${user.id}`} passHref key={user.id}>
                                <a
                                    className="link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {user.name}
                                </a>
                            </Link>).reduce((prev, curr) => [prev, ', ', curr])}
            </>
        );
    }
    return (
        <p>
            {props.by ? props.by : "By"} {props.users.map((user) => <Link href={`/users/${user.id}`} passHref key={user.id}>
                            <a
                                className="link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {user.name}
                            </a>
                        </Link>).reduce((prev, curr) => [prev, ', ', curr])}
        </p>
    );
} // here u can insert the code there. ill add it in the index file

export default Names;
