import { Stack, Typography } from "@mui/material"
import { Helmet } from "react-helmet"

export const About = ()=>{
    return (
        <>
            <Helmet title="About" />
            <Stack spacing={2} sx={{m: "50px 0"}} >
                <Typography variant="h2">About</Typography>
                <div className="about__description">
                    <p>
                        Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit iusto eligendi sed architecto temporibus earum fuga maxime, natus inventore iure. Incidunt ipsa veniam iusto eaque repellendus excepturi cupiditate voluptate corrupti.
                    </p>
                    <br />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing el. Corrupti officia, porro, nemo voluptatem ipsa culpa beatae ullam quam numquam maiores animi voluptatibus, vel quidem facere corporis reprehenderit pariatur non voluptates.
                    </p>
                    <br />
                    <p>
                        Lorem ipsum dolor it. Aperiam inventore modi quos aspernatur veritatis maiores doloremque sint vero aliquam esse perspiciatis excepturi, sunt deleniti odit ut. Nam sit amet consectetur adipisicing elit. Odit iusto eligendi sed architecto temporibus earum fuga maxime, natus inventore iure. Incidunt ipsa veniam iusto eaque repellendus excepturi cupiditate voluptate corrupti.
                    </p>
                </div>
            </Stack>
        </>
    )
}
