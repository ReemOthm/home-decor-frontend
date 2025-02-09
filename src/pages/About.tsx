import { Stack, Typography } from "@mui/material"
import { Helmet } from "react-helmet"

export const About = ()=>{
    return (
        <>
            <Helmet title="About" />
            <Stack spacing={2} sx={{m: "30px 0"}}  alignItems="center">
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
                        maiores doloremque sint ver sit amet consectetur adipisicing elit. Odit iusto eligendi sed architecto temporibus earum fuga maxime, natus inventore iure. Incidunt ipsa veniam iusto eaque repellendus excepturi cupiditate voluptate corrupti.
                    </p>
                </div>
            </Stack>
        </>
    )
}
