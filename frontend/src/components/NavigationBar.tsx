"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { Container, Nav, Navbar } from "react-bootstrap";
import Image from "next/image"
import logo from "@/images/logo.png";
import styles from "@/styles/NavigationBar.module.css"

const NavigationBar = () => {
    const pathname = usePathname();

    return (
        <div>
            <Navbar bg="surface-bg" variant="dark" sticky="top" expand="sm" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} href="/">
                        <Image 
                        src={logo}
                        alt="Movie Tracker Logo"
                        width={50}
                        height={50}
                        className="mb-2"
                        />
                        <span className={styles.brandText}>Movie Tracker</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-navbar" />
                    <Navbar.Collapse id="main-navbar">
                        <Nav>
                            <Nav.Link as={Link} href="/movie" active={pathname === "/movie"}>Movies</Nav.Link>
                            <Nav.Link as={Link} href="/movie/search" active={pathname === "/movie/search"}>Search for movies</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar