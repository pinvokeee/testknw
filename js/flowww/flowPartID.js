const flowPartID =
{
    count: -1,

    get()
    {
        this.count++;
        console.log(this.count);
        return this.count;
    },

    reset()
    {
        this.count = -1;
    }
}