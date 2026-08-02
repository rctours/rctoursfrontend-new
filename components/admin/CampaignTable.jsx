"use client";

import Link from "next/link";
import { useState } from "react";

export default function CampaignTable({
  campaigns = [],
  onDeleted,
}) {
  const [deletingId, setDeletingId] = useState(null);

  // ========================================
  // DELETE CAMPAIGN
  // ========================================

  const handleDelete = async (campaign) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${campaign.title}" campaign?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(campaign._id);

      const response = await fetch(
        `/api/admin/campaigns/${campaign._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to delete campaign"
        );
      }

      alert("Campaign deleted successfully!");

      // Parent page ko list reload karne ke liye bolenge
      if (onDeleted) {
        onDeleted();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Campaign Delete Error:", error);

      alert(
        error.message || "Failed to delete campaign"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">
                Poster
              </th>

              <th className="text-left px-6 py-4">
                Title
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Start Date
              </th>

              <th className="text-left px-6 py-4">
                End Date
              </th>

              <th className="text-center px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {campaigns.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-gray-500"
                >
                  No Campaigns Found
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <tr
                  key={campaign._id}
                  className="border-t hover:bg-gray-50"
                >
                  {/* POSTER */}

                  <td className="px-6 py-4">
                    {campaign.image ? (
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-24 h-14 object-cover rounded"
                      />
                    ) : (
                      <div className="w-24 h-14 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>

                  {/* TITLE */}

                  <td className="px-6 py-4 font-semibold">
                    {campaign.title}
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-4">
                    {campaign.active ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* START DATE */}

                  <td className="px-6 py-4">
                    {campaign.startDate || "-"}
                  </td>

                  {/* END DATE */}

                  <td className="px-6 py-4">
                    {campaign.endDate || "-"}
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">

                      {/* EDIT */}

                      <Link
                        href={`/admin/campaigns/${campaign._id}`}
                        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </Link>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(campaign)
                        }
                        disabled={
                          deletingId === campaign._id
                        }
                        className="
                          bg-red-600
                          hover:bg-red-700
                          disabled:bg-red-300
                          disabled:cursor-not-allowed
                          text-white
                          px-4
                          py-2
                          rounded
                        "
                      >
                        {deletingId === campaign._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>
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