import React from 'react'

import { Card,
         CardActionArea,
         CardMedia,
         CardContent,
         Typography,
         CardActions,
         Button }     from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { ReactTinyLink } from 'react-tiny-link';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
    width: 345,
  },
  media: {
    height: 140,
  },
  title: {
    color: theme.palette.primary.main
  }
}))

const ItemContainer = ({ onEditButtonClick }) => props => {
  console.log("ITEMCONTAINER!!!")
  return <Item item={props.item} onEditButtonClick={onEditButtonClick} />
}

const Item = React.memo((props) => {
  console.log(props)
  const classes = useStyles()

  let itemURL = ""
  let description = ""

  if (props.item.description) {
    description =
    <div>
      <h4>Description</h4>
      <p>{props.item.description}</p>
    </div>
  }

  if (props.item.itemURL) {
    itemURL = <ReactTinyLink
        cardSize="small"
        showGraphic={true}
        maxLine={3}
        minLine={1}
        url={props.item.itemURL}
    />
  }

  const EditButton = () => (
    <button type="button" className="btn btn-primary" id="event-edit-button" onClick={(event) => props.onEditButtonClick(props.item)}>
      <strong>Edit Wishlist Item</strong>
    </button>
  )

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {itemURL}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {props.item.item}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <EditButton/>
      </CardActions>
    </Card>
  )
})

export default ItemContainer;
