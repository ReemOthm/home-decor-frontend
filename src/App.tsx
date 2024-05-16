import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"

import "./App.css"
import useApiQuery from "./hooks/useApiQuery";

function App() {

  // Queries
  const { data, error, isLoading } = useApiQuery({queryKey: ["products"],method: "get" ,url: "/products"});
  console.log(data);

  if(isLoading) return <h1>data is loading</h1>

  return (
    <div className="App">
      <h1>nn</h1>
      <section>
        {data?.map((product) => (
          <Card key={product.id} sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                description goes here {product.productName}
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
