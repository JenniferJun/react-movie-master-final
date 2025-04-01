import { Link, useRouteMatch, useHistory } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: yellow;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  border: 2px white bold;
`;

const Logo = styled(motion.img)`
  margin-right: 50px;
  width: 120px;
  height: 120px;
  fill:  #424242;
  border-radius: 50%;
  border: 2px solid white;
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  
`;

const Item = styled.li`

  border: 5dpx solid white;
  margin-right: 20px;
  color: ${(props) => props.theme.yellow.logo};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 25px;
  font-weight: 800;
  &:hover {
    color: ${(props) => props.theme.yellow.darklogo};
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.yellow.logo};
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.yellow.lighter};
`;

const logoVariants = {
    normal: {
        fillOpacity: 1,
    },
    active: {
        fillOpacity: [0, 1, 0],
        transition: {
            repeat: Infinity,
        },
    },
};

const navVariants = {
    top: {
        backgroundColor: "rgba(255, 253, 208,0)",
    },
    scroll: {
        backgroundColor: "rgba(255, 253, 208,1)",
    },
};

interface IForm {
    keyword: string;
}

function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const homeMatch = useRouteMatch("/");
    const cgMatch = useRouteMatch("/comingsoon");
    const npMatch = useRouteMatch("/nowplaying");
    const inputAnimation = useAnimation();
    const navAnimation = useAnimation();
    const { scrollY } = useViewportScroll();
    const toggleSearch = () => {
        if (searchOpen) {
            inputAnimation.start({
                scaleX: 0,
            });
        } else {
            inputAnimation.start({ scaleX: 1 });
        }
        setSearchOpen((prev) => !prev);
    };
    useEffect(() => {
        scrollY.onChange(() => {
            if (scrollY.get() > 80) {
                navAnimation.start("scroll");
            } else {
                navAnimation.start("top");
            }
        });
    }, [scrollY, navAnimation]);
    const history = useHistory();
    const { register, handleSubmit } = useForm<IForm>();
    const onValid = (data: IForm) => {
        history.push(`/search?keyword=${data.keyword}`);
    };
    return (
        <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
            <Col>
                <Logo
                    src="/showsccp_tt.png"
                >
                </Logo>
                <Items>
                    <Item>
                        <Link to="/">
                            POPULAR {homeMatch?.isExact && <Circle layoutId="circle" />}
                        </Link>
                    </Item>
                    <Item>
                        <Link to="/comingsoon">
                            COMMING SOON {cgMatch && <Circle layoutId="circle" />}
                        </Link>
                    </Item>
                    <Item>
                        <Link to="/nowplaying">
                            NOW PLAYING {npMatch && <Circle layoutId="circle" />}
                        </Link>
                    </Item>
                </Items>
            </Col>
            <Col>
                <Search onSubmit={handleSubmit(onValid)}>
                    <motion.svg
                        onClick={toggleSearch}
                        animate={{ x: searchOpen ? -185 : 0 }}
                        transition={{ type: "linear" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </motion.svg>
                    <Input
                        {...register("keyword", { required: true, minLength: 2 })}
                        animate={inputAnimation}
                        initial={{ scaleX: 0 }}
                        transition={{ type: "linear" }}
                        placeholder="Search for movie or tv show..."
                    />
                </Search>
            </Col>
        </Nav>
    );
}

export default Header;