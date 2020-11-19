import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import "../styles/global.css";

const useItems = () => {
  const [items, setItems] = useState([])
  useEffect(() => {
    //added variable unsubscribe
    const unsubscribe = firebase
      .firestore()
      .collection("items")
      .onSnapshot(snapshot => {
        const listItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setItems(listItems)
      })
      //called the unsubscribe--closing connection to Firestore.
    return () => unsubscribe()
  }, [])
  return items
}

const ItemList = () => {
  const listItem = useItems();
  return (
    <table className="tg">
      <tbody>
        <tr>
          <td className="tg-ycr8">Name</td>
          <td className="tg-ycr8">Type</td>
          <td className="tg-i81m">Qty</td>
          <td className="tg-a02x">Description</td>
        </tr>
      </tbody>
      {listItem.map(item => (
        <tbody key={item.id}>
          <tr>
            <td className="tg-ycr8">{item.name}</td>
            <td className="tg-ycr8">{item.type}</td>
            <td className="tg-i81m">{item.qty}</td>
            <td className="tg-a02x">{item.description}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};
export default ItemList;