import { db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";


/* --------- Routines helpers --------- */

// fetch all routines for a user (returns array)
export async function fetchRoutinesFromFirestore(uid) {
  const q = query(collection(db, "routines"), where("uid", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// add routine (returns created doc id)
export async function addRoutineToFirestore(routine) {
  // routine: { uid, name, startTime, endTime, deviceActions, ... }
  const docRef = await addDoc(collection(db, "routines"), routine);
  return { id: docRef.id };
}

// update routine fields (partial)
export async function updateRoutineInFirestore(id, updates) {
  const ref = doc(db, "routines", id);
  await updateDoc(ref, updates);
  return true;
}

// delete routine
export async function deleteRoutineFromFirestore(id) {
  await deleteDoc(doc(db, "routines", id));
  return true;
}

/* --------- Rooms helpers --------- */

export const roomsCollection = () => collection(db, "rooms");

export async function addRoomToFirestore(room) {
  // room should include id, name, uid, createdAt
  const ref = doc(db, "rooms", room.id);
  await setDoc(ref, room);
  return room;
}

export async function fetchRoomsFromFirestore(uid) {
  const q = query(collection(db, "rooms"), where("uid", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateRoomInFirestore(id, updates) {
  const ref = doc(db, "rooms", id);
  await updateDoc(ref, updates);
}

export async function deleteRoomFromFirestore(id) {
  const ref = doc(db, "rooms", id);
  await deleteDoc(ref);
}

/* --------- Devices helpers --------- */

export const devicesCollection = () => collection(db, "devices");

export async function addDeviceToFirestore(device) {
  const ref = doc(db, "devices", device.id);
  await setDoc(ref, device);
  return device;
}

export async function fetchDevicesFromFirestore(uid) {
  const q = query(collection(db, "devices"), where("uid", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateDeviceInFirestore(id, updates) {
  const ref = doc(db, "devices", id);
  await updateDoc(ref, updates);
}

export async function deleteDeviceFromFirestore(id) {
  const ref = doc(db, "devices", id);
  await deleteDoc(ref);
}
