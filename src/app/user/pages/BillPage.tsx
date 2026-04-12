import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function BillPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const snap = await getDoc(doc(db, "orders", id!));
      if (snap.exists()) {
        setOrder({ id: snap.id, ...snap.data() });
      }
    };
    fetchOrder();
  }, [id]);

  // ✅ FIXED PRINT FUNCTION
  const handlePrint = () => {
    const content = document.getElementById("bill-content");
    if (!content) return;

    const win = window.open("", "", "width=400,height=600");
    if (!win) return;

    win.document.write(`
      <html>
        <head>
          <title>Bill</title>
          <style>
            body {
              font-family: monospace;
              padding: 10px;
            }
            h2 {
              text-align: center;
              margin-bottom: 5px;
            }
            p {
              font-size: 12px;
              margin: 2px 0;
            }
            hr {
              border-top: 1px dashed #000;
              margin: 6px 0;
            }
            .row {
              display: flex;
              justify-content: space-between;
              font-size: 14px;
            }
            .total {
              font-weight: bold;
              font-size: 15px;
            }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);

    win.document.close();

    win.onload = () => {
      win.print();
      win.close();
    };
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-sm mx-auto text-black bg-white">

      <div id="bill-content">

        <h2 className="text-center font-bold text-lg">CIBO Kitchen</h2>
        <p className="text-center text-xs">Thank You Visit Again</p>

        <hr className="my-2" />

        <p className="text-xs">Order ID: {order.id}</p>
        <p className="text-xs">Name: {order.name}</p>
        <p className="text-xs">
          Date: {new Date(order.createdAt?.toDate?.() || order.createdAt).toLocaleString()}
        </p>

        <hr className="my-2" />

        {order.items?.map((item: any, i: number) => (
          <div key={i} className="flex justify-between text-sm">
            <span>
              {item.item.name} x{item.quantity}
            </span>
            <span>₹{item.item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-2" />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>

        <p className="text-center text-xs mt-2">Paid</p>
      </div>

      {/* ✅ PRINT BUTTON */}
      <button
        onClick={handlePrint}
        className="mt-4 w-full bg-black text-white py-2 rounded"
      >
        Print
      </button>
    </div>
  );
}