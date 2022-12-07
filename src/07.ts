const input = (await Deno.readTextFile("./data/07.txt"))
  .split("\n")
  .map((line: string) => line.split(" "));

type Child = Directory | File;

class File {
  public parent!: Directory;
  constructor(public name: string, public size: number) {}
}

class Directory {
  public parent!: Directory;
  children: Child[] = [];

  constructor(public name: string) {}

  get size(): number {
    return this.children.reduce((total, child) => total + child.size, 0);
  }

  addChild(child: Child) {
    this.children.push(child);
    child.parent = this;
  }

  findChild(name: string) {
    return this.children.find((child) => child.name === name);
  }
}

function createFileSystem() {
  const root: Directory = new Directory("root");
  const directories: Directory[] = [root];
  let cwd = root;

  function changeDirectory(path: string) {
    if (path === "/") return root;
    if (path === "..") return cwd.parent;

    return cwd.findChild(path) as Directory;
  }

  input.forEach(([x, name, path]) => {
    if (x === "$" && name === "cd") {
      cwd = changeDirectory(path);
    }

    if (x === "dir") {
      const directory = new Directory(name);
      cwd.addChild(directory);
      directories.push(directory);
    }

    if (!isNaN(Number(x))) {
      cwd.addChild(new File(name, Number(x)));
    }
  });

  return directories;
}

const filesystem = createFileSystem();
const sizes = filesystem.map((directory) => directory.size);

sizes.filter((size) => size < 100000).reduce((sum, size) => sum + size);
Math.min(...sizes.filter((size) => size > filesystem[0].size - 40000000));
