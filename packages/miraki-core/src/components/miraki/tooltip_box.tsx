import React from "react";

interface ToolTipBoxProps {
    children?: React.ReactNode;
}

export const ToolTipTextBox: React.FC<ToolTipBoxProps> = (props: ToolTipBoxProps) => {
    return <div className="p-2 z-50 bg-primary rounded-md shadow-md">
    <p className="text-xs font-mono text-secondary">{props.children}</p>
  </div>
}


