import React, { useState } from 'react';
import { MdVerifiedUser } from 'react-icons/md';
import BasicDetails from '../../pages/Profile/BasicDetails';

const ProfileDetails = ({ profile }: any) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedAddressFile, setSelectedAddressFile] = useState<any>(null);
  return (
    <div className="mt-4">
      <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
        <span className="text-meta-3"> My Reffer Code:</span>
        {profile?.myReferralCode}
      </h3>

      <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
        <p className="text-meta-3 flex justify-center gap-2">
          {profile?.isKycVerifyed ? (
            <div className="flex">
              <p>Verified</p>
              <MdVerifiedUser className="mt-1" />
            </div>
          ) : (
            <p className="text-meta-8">
              {profile?.kycStatus == 'REJECT' ? 'REJECTED' : profile?.kycStatus}
            </p>
          )}
        </p>
      </h3>
    </div>
  );
};

export default ProfileDetails;
