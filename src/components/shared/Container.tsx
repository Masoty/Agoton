import React, {FC, HTMLAttributes} from 'react';

interface Container extends HTMLAttributes<HTMLDivElement>{
    children: React.ReactNode
}

const Container: FC<Container> = ({ children, className, ...props}) => {
    return (
        <div className={`flex mx-auto w-full px-4 ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Container;