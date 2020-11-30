import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react";
import { WishlistDataService } from "../requests"


const buttonStyle = { marginRight: 10 };

function WishlistForm({ wishlistStore, wishlistItem, onCancel, edit }) {
  let [name, setName] = React.useState("");
  let [item, setItem] = React.useState("");
  let [itemURL, setItemURL] = React.useState("");
  let [priority, setPriority] = React.useState(0);
  let [description, setDescription] = React.useState("");
  const [id, setId] = React.useState(null);

  React.useEffect(() => {
    setId(wishlistItem.id);
    setName(wishlistItem.name);
    setItem(wishlistItem.item);
    setItemURL(wishlistItem.itemURL);
    setPriority(wishlistItem.priority);
    setDescription(wishlistItem.description);
    }, [
        wishlistItem.id,
        wishlistItem.name,
        wishlistItem.item,
        wishlistItem.itemURL,
        wishlistItem.priority,
        wishlistItem.description
  ]);

  const handleSubmit = async ev => {
    ev.preventDefault();
    if (!name || !item) {
      return;
    }

    if (itemURL === undefined || description === undefined || priority === undefined) {
        itemURL="";
        description=""
        priority=0
    }

    console.log('EVENT')
    console.log(ev.target)

    let myItem = {
      name,
      item,
      itemURL,
      priority,
      description
    };

    console.log('WISHLIST-ITEM!')
    console.log(myItem)

    if (!edit) {
      await WishlistDataService.createItem(myItem);
    } else {
      await WishlistDataService.updateItem(id, myItem);
    }

    const response = await WishlistDataService.getAllItems();
      response.get().then(querySnapshot => {
         const items = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            console.log("GETALL")
            console.log(data)
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
          // data = { id: null, name: "", item: "", itemURL: "", priority: "", description: "" }
          // setWishlistItem(data);
          onCancel();
        })
        .catch(err => {
          console.log('Error fetching records', err);
        })
  };

  const handleNameChange = ev => setName(ev.target.value);
  const handleItemChange = ev => setItem(ev.target.value);
  const handleItemURLChange = ev => setItemURL(ev.target.value);
  const handlePriorityChange = ev => setPriority(ev.target.value);
  const handleDescriptionChange = ev => setDescription(ev.target.value);

  const deleteWishlistItem = async () => {
    await WishlistDataService.deleteItem(wishlistItem.id);
    const response = await WishlistDataService.getAllItems();
    response.get().then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      const items = data.map(d => {
        return {
            id: id,
            name: d.name,
            item: d.item,
            itemURL: d.itemURL,
            priority: d.priority,
            description: d.description
        }
      })
      wishlistStore.setWishlistItems(items);
      onCancel();
  })
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="name">
          <Form.Label>Who Is Making the Wish?</Form.Label>
          <br />
            <select
                value={name || ""}
                className="form-control form-control-lg"
                onChange={handleNameChange}
              >
                <option value={null}> Select Your Name </option>
                <option value="Grannie Rie" >Grannie Rie</option>
                <option value="Rian" >Rian</option>
                <option value="Shawnie" >Shawnie</option>
                <option value="Tydra" >Tydra</option>
                <option value="Tavi" >Tavi</option>
                <option value="Ari" >Ari</option>
                <option value="Keita" >Keita</option>
                <option value="Josh" >Josh</option>
                <option value="Jaren" >Jaren</option>
            </select>
          <Form.Control.Feedback type="invalid">{!name}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="12" controlId="item">
          <Form.Label>What Do You Wish For?</Form.Label>
            <br />
              <Form.Control
                type="text"
                name="item"
                placeholder="Write the name of the item you want"
                value={item}
                onChange={handleItemChange}
                />
            <Form.Control.Feedback type="invalid">{!item}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="12" controlId="itemURL">
          <Form.Label>Have a link to the item you want? Paste it here: </Form.Label>
            <br />
              <Form.Control
                type="text"
                name="itemURL"
                defaultValue=""
                onChange={handleItemURLChange}
                placeholder="Add link to your wishlist item" />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="12" controlId="description">
          <Form.Label>Description</Form.Label>
            <br />
              <textarea
                className="form-control"
                value={description || ""}
                onChange={handleDescriptionChange}
                placeholder="Tell us about your wishlist item!" />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} md="12" controlId="priority">
          <Form.Label>How Badly Do You Want This Item?</Form.Label>
          <br />
            <select
                className="form-control"
                size="3"
                value={priority}
                onChange={handlePriorityChange}
                >
                <option value="1">I will survive without this.</option>
                <option value="2">This would be nice to have!</option>
                <option value="3">I will cease to exist without this in my life.</option>
            </select>
        </Form.Group>
      </Form.Row>

      <Button type="submit" className="btn btn-info" style={buttonStyle}>
        Save
      </Button>
      <Button type="button"  className="btn btn-primary" style={buttonStyle} onClick={deleteWishlistItem}>
        Delete
      </Button>
      <Button type="button" className="btn btn-danger" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
}

export default observer(WishlistForm);
