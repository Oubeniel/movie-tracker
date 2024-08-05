import Link from "next/link";
import { Button } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      Home page
      <div>
        <Link href="/movies/titles">New search</Link>
      </div>
    </div>
  );
}
