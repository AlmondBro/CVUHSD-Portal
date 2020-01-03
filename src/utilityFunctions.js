let isEmpty  = (string) => {
    let that = this;
    if (string) {
        that = string;
    }
    return ((!that || /^\s*$/.test(that)) || that.length === 0 || !that.trim);
};

//String.prototype.isEmpty = isEmpty;

export { isEmpty }