import { Injectable } from "@angular/core";
import { VoteItem } from "../interfaces/vote-item";

@Injectable({
  providedIn: "root"
})
export class VoteService {
  private history: VoteItem[][] = [];
  private items: VoteItem[] = [];

  constructor() {}

  getItems(): VoteItem[] {
    return this.items;
  }

  addItem(name: string): void {
    this.markHistoryBeforeChange();

    const newItem: VoteItem = { name, votes: 0 };
    // TODO - this needs to be immutable
    this.items.push(newItem);
  }

  removeItem(name: string): void {
    this.markHistoryBeforeChange();

    // TODO find the item in the list and remove it immutably
    let i: number = this.items.findIndex(item => item.name === name);
    this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    console.log(this.items);
  }

  upvote(name: string): void {
    this.markHistoryBeforeChange();

    // TODO find the item in the list and add 1 to the votes
    let i = this.items.findIndex(item => item.name === name);
    let itemUpvote = this.items[i];
    this.items = [
      ...this.items.slice(0, i),
      { ...itemUpvote, votes: itemUpvote.votes + 1 },
      ...this.items.slice(i + 1)
    ];
  }

  downvote(name: string): void {
    this.markHistoryBeforeChange();

    // TODO find the item in the list and remove 1 from the votes
    let i = this.items.findIndex(item => item.name === name);
    let itemDownvote = this.items[i];
    this.items = [
      ...this.items.slice(0, i),
      { ...itemDownvote, votes: itemDownvote.votes - 1 },
      ...this.items.slice(i + 1)
    ];
  }

  undo() {
    if (this.history.length) {
      // Take the most recent history and use it to replace the list.
      this.items = this.history.pop();
    } else {
      throw new Error("No more undos available.");
    }
  }

  private markHistoryBeforeChange() {
    // Add a snapshot to the history.
    this.history.push(this.items);
  }
}
