import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const addRoomToDB = async (uid, room) => {
  await addDoc(collection(db, "rooms"), { ...room, uid });
};

export const fetchUserRooms = async (uid) => {
  const q = query(collection(db, "rooms"), where("uid", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
