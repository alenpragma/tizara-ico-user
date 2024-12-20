import React, { useState } from 'react';

type Stake = {
  userId: string;
  stakeAmount: number;
  createdAt: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  referralCode: string;
  myReferralCode: string;
  stakes: Stake[];
  children: User[];
};

type TreeNodeProps = {
  user: User;
};

const TreeNode: React.FC<TreeNodeProps> = ({ user }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="ml-4">
      {/* Node Header */}
      <div
        className="flex items-center cursor-pointer space-x-2 p-2 bg-gray-100 hover:bg-gray-200 rounded"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-xl">{expanded ? '▼' : '▶'}</span>
        <div className="font-semibold text-gray-800">
          {user.name}{' '}
          <span className="text-sm text-gray-500">({user.email})</span>
        </div>
      </div>

      {/* Node Details */}
      {expanded && (
        <div className="ml-6 mt-2 space-y-2 text-gray-700">
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Message:</strong> {user.message || 'N/A'}
          </p>
          <p>
            <strong>Referral Code:</strong> {user.referralCode}
          </p>
          <p>
            <strong>My Referral Code:</strong> {user.myReferralCode}
          </p>

          {/* Stakes */}
          {user.stakes.length > 0 && (
            <div>
              <p className="font-semibold">Stakes:</p>
              <ul className="ml-4 list-disc">
                {user.stakes.map((stake, index) => (
                  <li key={index}>
                    Amount: ${stake.stakeAmount.toLocaleString()}, Created:{' '}
                    {new Date(stake.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Children */}
          {user.children.length > 0 && (
            <div>
              <p className="font-semibold">Children:</p>
              {user.children.map((child) => (
                <TreeNode key={child.id} user={child} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

type TreeViewProps = {
  data: User[];
};

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  return (
    <div className="p-4">
      {data.map((user) => (
        <TreeNode key={user.id} user={user} />
      ))}
    </div>
  );
};

export default TreeView;
