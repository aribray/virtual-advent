import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import WishlistForm from "./WishlistForm";
import { observer } from "mobx-react";
import { WishlistDataService }  from "../requests";
import ItemContainer from "../components/item";
import WishlistContainer from "../components/WishlistContainer";
import { Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Container,
    CardHeader,
    Collapse,
    IconButton,
    Avatar}     from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { ReactTinyLink } from 'react-tiny-link';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { makeStyles } from '@material-ui/core/styles';
import { withAuthorization } from  "./Session"
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "#AD2301",
    fontSize: "14px",
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    justifyContent: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#bdd4e7",
    backgroundImage: "linear-gradient(315deg, #bdd4e7 10%, #8693ab 80%)",
    width: "100%",
    boxSizing: 'border-box'
  }
}));


function Wishlist({ wishlistStore }) {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [wishlistItem, setWishlistItem] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();

  const hideModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const grouped = groupBy(wishlistStore.wishlistItems, item => item.name);
  let content = []
  console.log('GROUPED!!')
  console.log(grouped)

  React.useEffect(() =>
      {
    if (!initialized) {
      getWishlistItems();
    }
  })

  const editButtonClickHandler = (wishlistItem, e) => {
    setShowAddModal(false);
    setShowEditModal(true);
    let { id, name, item, itemURL, priority, description  } = wishlistItem;
    const data = { id, name, item, itemURL, priority, description };
    WishlistDataService.updateItem(data.id, data);
    setWishlistItem(data);
  };

  const CardItem = ({ classes, description, data, itemURL }) => {

    const EditButton = () => (
      <button type="button" className="btn btn-primary" id="event-edit-button" onClick={(event) => editButtonClickHandler(data)}>
        <strong>Edit Wishlist Item</strong>
      </button>
    )

    console.log(classes)
    return (
      <Grid item style={{boxSizing:'content-box', width: '100%'}} >
        <Card className={classes.paper} key={data.id}>

          <CardHeader
            avatar={
              <Avatar aria-label="wishlist-name"  className={classes.avatar} >
                {data.name}
              </Avatar>
            }
          />
          {itemURL}
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className="item-name">
                {data.item}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {description}
            </Typography>
            </CardContent>
          <CardActions>
            <EditButton />
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            </CardActions>
        </Card>
      </Grid>
    );
  }

  const createItemCards = () => {
    const wishlistCards = grouped.forEach(function(value, key) {
      let eachPerson = [];
      for (const item of value) {

        const data = {
          id: item.id,
          item: item.item,
          name: item.name,
          description: item.description,
          itemURL: item.itemURL,
          priority: item.priority
        }

        console.log(data)

        let itemURL = "";
        let description = "";

        if (data.itemURL) {
          itemURL = <ReactTinyLink
          cardSize="small"
          showGraphic={true}
          maxLine={3}
          minLine={1}
          url={data.itemURL}
          />
        }

        if (data.description) {
            description =
            <div>
              <h4>Description</h4>
                <p>{data.description}</p>
            </div>
          }

          eachPerson.push(
            <Grid container spacing={8} style={{ boxSizing: 'content-box', width: '100%'}}>
                <CardItem classes={classes} data={data} description={description} itemURL={itemURL}/>
            </Grid>
          )
      }
      // console.log("eachperson!", eachPerson)
      content.push(eachPerson);
      console.log('CONTENT', content)
    })
    return content;
  }

  // const editButtonClickHandler = (wishlistItem, e) => {
  //   setShowAddModal(false);
  //   setShowEditModal(true);
  //   let { id, name, item, itemURL, priority, description  } = wishlistItem;
  //   const data = { id, name, item, itemURL, priority, description };
  //   WishlistDataService.updateItem(data.id, data);
  //   setWishlistItem(data);
  // };

  function groupBy(list, keyGetter) {
    const map = new Map();
    console.log(list)
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
  }

  const getWishlistItems = async () => {
    const response = await WishlistDataService.getAllItems();
    console.log(response);
    response.get().then(querySnapshot => {
        const items = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {
                id: id,
                name: data.name,
                item: data.item,
                itemURL: data.itemURL,
                priority: data.priority,
                description: data.description
              }
        });
        wishlistStore.setWishlistItems(items);
        setInitialized(true);
    })
    setInitialized(true);
  };




    return (
        <div className="page">

          <WishlistForm
              wishlistStore={wishlistStore}
              wishlistItem={wishlistItem}
              onCancel={hideModals.bind(this)}
              edit={false}
          />

          <Modal show={showEditModal} onHide={hideModals}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Wishlist Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <WishlistForm
                    // onClick={handleSelect}
                    wishlistStore={wishlistStore}
                    wishlistItem={wishlistItem}
                    onCancel={hideModals.bind(this)}
                    edit={true}
                />
            </Modal.Body>
          </Modal>
            <h2 style={{textAlign: "center"}}>Family Wish List</h2>
              <div className="wishlist-div" style={{display: "flex", flexDirection:"row", flexWrap: "wrap", justifyContent: "center", alignContent: "space-between"}}>
                { createItemCards() }
              </div>
        </div>
      );
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(observer(Wishlist));


// {
//   // TODO might need to pass wishlistItem?
//   wishlistStore.wishlistItems.map((item) => {
//       let itemURL = ""
//       let description = ""
//       if (item.description) {
//         description = item.description
//       }
//       if (item.itemURL) {
//         itemURL = <ReactTinyLink
//             cardSize="small"
//             showGraphic={true}
//             maxLine={3}
//             minLine={1}
//             url={item.itemURL}
//         />
//       }


//       return (
//         <Card className="root"
//               key={item.id}>
//           <CardActionArea>
//             {itemURL}
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="h2" className="title">
//                 {item.item}
//               </Typography>
//               <Typography variant="body2" color="textSecondary" component="h3">
//                 {description}
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//           <CardActions>
//             <EditButton/>
//           </CardActions>
//         </Card>
//       )
//   })}


//   console.log(wishlistStore.wishlistItems);

//   const handleSelect = (e) => {
//     const data = { name: "", item: "", itemURL: "", description: "", priority: 0 };
//     setShowAddModal(true);
//     setShowEditModal(false);
//     setWishlistItem(data);
//   };
    // setItems(items)

  // let response = []

  // grouped.forEach(function(value, key) {
  //   for (const item of value) {

  //     const EditButton = () => (
  //       <button type="button" className="btn btn-primary" id="event-edit-button" onClick={(event) => editButtonClickHandler(item)}>
  //         <strong>Edit Wishlist Item</strong>
  //       </button>
  //     )

  //     const data = {
  //       id: item.id,
  //       item: item.item,
  //       name: item.name,
  //       description: item.description,
  //       itemURL: item.itemURL,
  //       priority: item.priority
  //     }

  //     console.log("DATA!", data)

  //     let itemURL = "";
  //     let description = "";

  //     if (data.itemURL) {
  //       itemURL = <ReactTinyLink
  //       cardSize="small"
  //       showGraphic={true}
  //       maxLine={3}
  //       minLine={1}
  //       url={data.itemURL}
  //       />
  //     }

  //     if (data.description) {
  //         description =
  //         <div>
  //           <h4>Description</h4>
  //             <p>{data.description}</p>
  //         </div>
  //       }

  //     return (
  //         <Card className={classes.root} key={data.id}>
  //             <CardHeader
  //               avatar={
  //                 <Avatar aria-label="wishlist-name"  className={classes.avatar} >
  //                   {data.name}
  //                 </Avatar>
  //               }
  //               title={data.item}
  //             />
  //             {itemURL}
  //             <CardContent>
  //             <Typography gutterBottom variant="h5" component="h2" className="item-name">
  //                 {data.item}
  //             </Typography>
  //             <Typography variant="body2" color="textSecondary" component="p">
  //                 {description}
  //             </Typography>
  //             </CardContent>
  //           <CardActions>
  //             <EditButton/>
  //             <IconButton aria-label="add to favorites">
  //               <FavoriteIcon />
  //             </IconButton>
  //             <IconButton aria-label="share">
  //               <ShareIcon />
  //             </IconButton>
  //         </CardActions>
  //         </Card>
  //     )
  //   }
  // })