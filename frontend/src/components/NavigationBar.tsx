"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Image from "next/image"
import logo from "@/images/logo.png";
import styles from "@/styles/NavigationBar.module.css"
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { User } from "@/models/user";
import { useState } from "react";
import LoginModal from "./auth/LoginModal";
import SignUpModal from "./auth/SignUpModal";
import * as UsersApi from "@/network/api/users"
import placeholder from "@/images/no-image-placeholder.jpg"


const NavigationBar = () => {
    const pathname = usePathname();

    const { user } = useAuthenticatedUser();

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
                        {user ? <LoggedInView user={user} /> : <LoggedOutView />}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

interface LoggedInViewProps {
    user: User,
}


const LoggedInView = ({ user }: LoggedInViewProps) => {

    const { mutateUser } = useAuthenticatedUser();

    async function logout() {
        try {
            await UsersApi.logOut();
            mutateUser(null);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Nav className='ms-auto'>
            <Navbar.Text className="ms-md-3">
                Hello, {user.displayName ?? "User"}!
            </Navbar.Text>
            <NavDropdown
                className={styles.accountDropdown}
                title={
                    <Image
                        src={user.profilePictureUrl ?? placeholder}
                        width={40}
                        height={40}
                        alt="User profile picture"
                        className="rounded-circle"
                    />
                }
            >
                {user.username &&
                    <>
                        <NavDropdown.Item as={Link} href={"/users/" + user.username}>
                            Profile
                        </NavDropdown.Item>
                        <NavDropdown.Divider></NavDropdown.Divider>
                    </>
                }
                <NavDropdown.Item onClick={logout}>
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
}

const LoggedOutView = () => {

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    return (
        <>
            <Nav className='ms-auto'>
                <Button
                    variant="outline-primary"
                    className="ms-md-2 mt-2 mt-md-0" //ms is margin start, which is set to 2 when md, which is medium sized screens. mt-2 is margin top size 2 and with mt-md-0 margin top changes to size 0 when screen size is medium or above
                    onClick={() => setShowLoginModal(true)}
                >Log In</Button>
                <Button
                    variant="outline-primary"
                    className="ms-md-2 mt-2 mt-md-0"
                    onClick={() => setShowSignUpModal(true)}
                >Sign Up</Button>
            </Nav>
            {showLoginModal &&
                <LoginModal
                    onDismiss={() => setShowLoginModal(false)}
                    onSignUpInsteadClicked={() => {
                        setShowLoginModal(false);
                        setShowSignUpModal(true);
                    }}
                    onForgotPasswordClicked={() => { }} />
            }
            {showSignUpModal &&
                <SignUpModal
                    onDismiss={() => setShowSignUpModal(false)}
                    onLoginInsteadClicked={() => {
                        setShowSignUpModal(false);
                        setShowLoginModal(true);
                    }}
                />
            }


        </>
    )
}

export default NavigationBar