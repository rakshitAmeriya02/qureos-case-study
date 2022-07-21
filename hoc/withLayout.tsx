import React from "react";
import HeaderBar from "@/components/HeaderBar";

const withLayout = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    return (
      <div className="flex flex-col h-full">
        <HeaderBar />
        <div
          className="flex-1 p-4 overflow-y-auto"
        >
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
};

export default withLayout;
