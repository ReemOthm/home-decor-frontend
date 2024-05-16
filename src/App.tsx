import { useQuery } from "@tanstack/react-query"
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"

import { Product } from "./types"
import api from "./api"

import "./App.css"

function App() {
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })


  return (
    <div className="App">
      <h1>cgv</h1>
      <section>
        {data?.map((product) => (
          <Card key={product.id} sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                description goes here
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Add to cart</Button>
            </CardActions>
          </Card>
        ))}
      </section>
      {error && <p >{error.message}</p>} 
    </div>
  )
}

export default App
