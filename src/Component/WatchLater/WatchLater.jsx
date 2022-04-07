import React from "react";
import Paper from "@mui/material/Paper";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";

function WatchLater() {
  const navigate = useNavigate();
  const watch = useStore((state) => state.watch);
  const watchlater = useStore((state) => state.watchlater);
  const removeWatch = useStore((state) => state.removeWatch);
  const clearAllWatchLater = useStore((state) => state.clearAllWatchLater);

  return (
    <>
      {watch.length > 0 ? (
        <TableContainer align="center">
          <Table
            sx={{ flexGrow: 1, width: { xs: 500, md: 1000 } }}
            aria-label="spanning table"
            component={Paper}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  Your Cart
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product images</TableCell>
                <TableCell>List of Products</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {watch.map((item) => {
                const { movie, itemId, quantity } = item;
                return (
                  <TableRow key={itemId}>
                    <TableCell button>
                      <ListItemAvatar>
                        <img
                          src={movie.image}
                          alt={movie.title}
                          width="70px"
                          style={{ objectFit: "contain" }}
                        />
                      </ListItemAvatar>
                      <ListItemText />
                    </TableCell>
                    <TableCell>{movie.title}</TableCell>

                    <TableCell align="center">
                      <Button variant="outlined" color="error">
                        <DeleteIcon onClick={() => removeWatch(itemId)} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableRow>
                <TableCell colSpan={2} align="left">
                  <Button
                    onClick={() => clearAllWatchLater()}
                    variant="outlined"
                    color="error"
                  >
                    Clear All
                  </Button>
                </TableCell>

                <TableCell align="left">
                  <Button
                    variant="outlined"
                    style={{ color: "#2E3B55", borderColor: "#2E3B55" }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <BackspaceIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CardContent>
          <CardMedia
            component="img"
            height="300px"
            width="500px"
            image="empty-cart.png"
            alt="Empty Cart"
            style={{ objectFit: "contain" }}
          />
          <hr />
          <Box textAlign="center" sx={{ display: { xs: "block" } }}>
            <Button
              variant="outlined"
              style={{
                color: "white",
                borderColor: "white",
                backgroundColor: "#2E3B55",
              }}
              onClick={() => {
                navigate("/trending");
              }}
            >
              WatchList is Empty
            </Button>
          </Box>
        </CardContent>
      )}
    </>
  );
}

export default WatchLater;
