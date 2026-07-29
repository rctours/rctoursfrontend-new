"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [membership, setMembership] = useState("All");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    fetchCustomers();
  }, [search, membership, sort]);

  async function fetchCustomers() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/admin/customers?search=${encodeURIComponent(
          search
        )}&membership=${membership}&sort=${sort}`
      );

      const data = await res.json();

      if (data.success) {
        setCustomers(data.customers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function badgeColor(level) {
    switch (level) {
      case "Silver":
        return "bg-gray-200 text-gray-700";

      case "Gold":
        return "bg-yellow-100 text-yellow-700";

      case "Platinum":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-orange-100 text-orange-700";
    }
  }

  return (
    <div className="p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Customers
          </h1>

          <p className="text-gray-500 mt-1">
            Total Customers : {customers.length}
          </p>

        </div>

      </div>

      {/* Filters */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <input
          type="text"
          placeholder="Search Name / Mobile / Email"
          className="border rounded-lg p-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg p-3"
          value={membership}
          onChange={(e) => setMembership(e.target.value)}
        >
          <option>All</option>
          <option>Bronze</option>
          <option>Silver</option>
          <option>Gold</option>
          <option>Platinum</option>
        </select>

        <select
          className="border rounded-lg p-3"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="points">Highest Points</option>
          <option value="spend">Highest Spend</option>
          <option value="bookings">Most Bookings</option>
        </select>

      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Mobile</th>

              <th className="p-4 text-center">
                Bookings
              </th>

              <th className="p-4 text-center">
                Spend
              </th>

              <th className="p-4 text-center">
                Points
              </th>

              <th className="p-4 text-center">
                Membership
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center p-8"
                >
                  Loading...
                </td>

              </tr>

            ) : customers.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center p-8"
                >
                  No Customers Found
                </td>

              </tr>

            ) : (

              customers.map((customer) => (

                <tr
                  key={customer._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {customer.name}
                  </td>

                  <td className="p-4">
                    {customer.mobile}
                  </td>

                  <td className="p-4 text-center">
                    {customer.totalBookings}
                  </td>

                  <td className="p-4 text-center">
                    ₹{customer.totalSpent}
                  </td>

                  <td className="p-4 text-center">
                    {customer.loyaltyPoints}
                  </td>

                  <td className="p-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(
                        customer.membership
                      )}`}
                    >
                      {customer.membership}
                    </span>

                  </td>

                  <td className="p-4 text-center">

                    <Link
                      href={`/admin/customers/${customer._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}