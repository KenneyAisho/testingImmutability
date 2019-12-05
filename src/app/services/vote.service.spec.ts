import { TestBed } from "@angular/core/testing";

import { VoteService } from "./vote.service";

describe("VoteServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should start empty", () => {
    const service: VoteService = TestBed.get(VoteService);
    expect(service.getItems()).toEqual([]);
  });

  it("should add to the list", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 },
      { name: "Beta", votes: 0 }
    ]);
  });

  it("should be able to undo after adding", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    service.undo();
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
    service.undo();
    expect(service.getItems()).toEqual([]);
  });

  it("should be able to undo remove an item", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.removeItem("Alpha");
    service.undo();
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
  });

  it("should be able to remove an item", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.removeItem("Alpha");
    expect(service.getItems()).toEqual([]);
  });

  it("should upvote", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Bill");
    service.upvote("Bill");
    expect(service.getItems()).toEqual([{ name: "Bill", votes: 1 }]);
  });

  it("should upvote and undo upvote", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Rick");
    service.upvote("Rick");
    service.undo();
    expect(service.getItems()).toEqual([{ name: "Rick", votes: 0 }]);
  });

  it("should downvote", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Morty");
    service.upvote("Morty");
    service.downvote("Morty");
    expect(service.getItems()).toEqual([{ name: "Morty", votes: 0 }]);
  });
  it("should downvote", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Morty");
    service.downvote("Morty");
    expect(service.getItems()).toEqual([{ name: "Morty", votes: -1 }]);
  });

  it("should undo downvote", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Morty");
    service.upvote("Morty");
    service.downvote("Morty");
    service.undo();
    expect(service.getItems()).toEqual([{ name: "Morty", votes: 1 }]);
  });

  // TODO - test removeItem & undo
  // TODO - test removeItem
  // TODO - test upvote
  // TODO - test upvote & undo
  // TODO - test downvote
  // TODO - test downvote & undo
});
