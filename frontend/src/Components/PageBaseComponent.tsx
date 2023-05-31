import React from "react";

type Props = {
    title: string;
    main: JSX.Element[];
    buttons: JSX.Element[];
};

// ページのベースとなるコンポーネント
export const PageBase: React.FC<Props> = (props) => {
    const { title, main, buttons } = props;
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8">{title}</h1>
            {main.map((item, index) => (
                <div key={index}>
                    {item}
                </div>
            ))}
            {buttons.map((button, index) => (
                <div key={index}>
                    {button}
                </div>
            ))}
        </div>
    );
};