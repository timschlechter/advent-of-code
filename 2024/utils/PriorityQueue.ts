export class PriorityQueue<T> {
  private elements: { value: T; priority: number }[] = [];

  enqueue(value: T, priority: number): void {
    const index = this.elements.findIndex((el) => el.priority > priority);

    if (index === -1) {
      this.elements.push({ value, priority });
    } else {
      this.elements.splice(index, 0, { value, priority });
    }
  }

  dequeue(): T | undefined {
    return this.elements.shift()?.value;
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }

  size(): number {
    return this.elements.length;
  }
}
