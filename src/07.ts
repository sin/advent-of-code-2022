const input = (await Deno.readTextFile("./data/07.txt"))
  .split("\n")
  .map((line: string) => line.split(" "));

type ChildrenList = (Directory | File)[];

class File {
  constructor(
    public name: string,
    public size: number,
    public parent: Directory | null = null
  ) {}
}

class Directory {
  children: ChildrenList = [];

  constructor(public name: string, public parent: Directory | null = null) {}

  get size(): number {
    return this.children.reduce((total, child) => total + child.size, 0);
  }

  addChild(child: Directory | File) {
    this.children.push(child);
    child.parent = this;
  }

  findChild(name: string) {
    return this.children.find((child) => child.name === name);
  }

  listAllDirectories() {
    const subdirs: Directory[] = this.children
      .filter((child) => child instanceof Directory)
      .flatMap((child) => (child as Directory).listAllDirectories());

    return [this, ...subdirs];
  }
}

function createFileSystem() {
  const treeRoot: Directory = new Directory("root", null);
  let cwd = treeRoot;

  function changeDirectory(path: string) {
    if (path === "/") return treeRoot;
    if (path === "..") return cwd.parent;

    return cwd.findChild(path);
  }

  for (const [x, name, path] of input) {
    // x is either: '$', 'dir' or file size
    if (x === "$") {
      if (name === "cd") {
        cwd = changeDirectory(path) as Directory;
      }
      continue; // no-op if command is 'ls'
    }

    const child = x === "dir" ? new Directory(name) : new File(name, Number(x));
    cwd.addChild(child);
  }

  return treeRoot;
}

const filesystem = createFileSystem();
const toFree = filesystem.size - 40000000;

const sizes = filesystem
  .listAllDirectories()
  .map((directory) => directory.size);

sizes.filter((size) => size < 100000).reduce((sum, size) => sum + size);
Math.min(...sizes.filter((size) => size > toFree));
