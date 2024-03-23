export interface GetBooksRequest{
    title?: string,
    firstName?: string,
    lastName?: string,
    type?: string,
    isbn?: string,
    category?: string,
    available?: boolean,
}

export interface AddBookRequest{
    id: number,
    title?: string,
    firstName?: string,
    lastName?: string,
    type?: string,
    isbn?: string,
    category?: string,
    totalCopies: number,
    copiesInUse: number,
}

export interface PutBookRequest{
    id?: number,
    title?: string,
    firstName?: string,
    lastName?: string,
    type?: string,
    isbn?: string,
    category?: string,
    totalCopies?: number,
    copiesInUse?: number,
}