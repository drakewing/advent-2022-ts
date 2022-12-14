enum NodeType {
  Directory,
  File,
}

interface FsNode {
  kind: NodeType;
  name: string;
  size: number;
  parent?: FsNode;
  children: FsNode[];
}

// surely, all dirs are present
const cd = (dir: string, wd: FsNode): FsNode => {
  // up one?
  if (dir === '..' && wd.parent) {
    return wd.parent;
  }

  // down one?
  if (dir !== '/') {
    return wd.children.find((child) => child.name === dir) || wd;
  }

  // back to root
  let cur = wd.parent;
  while (cur) {
    cur = cur.parent;
  }
  return wd;
};

const addIfNew = (cand: FsNode, wd: FsNode) => {
  if (wd.children.find((child) => child.name === cand.name)) return;

  wd.children.push(cand);
};

const commandLoop = (wd: FsNode, commands: string[]) => {
  let cur = wd;

  commands.forEach((cmd) => {
    const parts = cmd.split(' ');
    if (parts[1] === 'cd') {
      cur = cd(parts[2], cur);
      return;
    }

    if (parts[1] === 'ls') {
      return;
    }

    if (parts[0] === 'dir') {
      addIfNew(
        {
          kind: NodeType.Directory,
          name: parts[1],
          size: 0,
          parent: cur,
          children: [],
        },
        cur,
      );
      return;
    }

    addIfNew(
      {
        kind: NodeType.File,
        name: parts[1],
        size: parseInt(parts[0], 10),
        parent: cur,
        children: [],
      },
      cur,
    );
  });
};

// optionally track sizes smaller than a given num - kind of cluttered
const findNodeSize = (
  node: FsNode,
  dirSizes?: number[],
  n?: number,
): number => {
  if (node.kind === NodeType.File) return node.size;

  const size = node.children.reduce(
    (acc, child) => acc + findNodeSize(child, dirSizes, n),
    0,
  );
  if (n && dirSizes && size < n) {
    dirSizes.push(size);
  }
  return size;
};

const sumDirsLessThan = (root: FsNode, n: number): number => {
  const dirSizes: number[] = [];
  findNodeSize(root, dirSizes, n);
  return dirSizes.reduce((acc, s) => acc + s, 0);
};

export const d07p1 = (input: string[]): number => {
  const root: FsNode = {
    kind: NodeType.Directory,
    name: '/',
    size: 0,
    children: [],
  };
  const wd = root;
  commandLoop(wd, input);
  return sumDirsLessThan(root, 100000);
};

export const d07p2 = (input: string[]): number => {
  const root: FsNode = {
    kind: NodeType.Directory,
    name: '/',
    size: 0,
    children: [],
  };
  const wd = root;
  commandLoop(wd, input);

  const dirSizes: number[] = [];
  const maxSpace = 70000000;
  const usedSpace = findNodeSize(root, dirSizes, maxSpace);
  const neededSpace = 30000000 - (maxSpace - usedSpace);

  dirSizes.sort((a, b) => a - b);
  return dirSizes.find((sz) => sz >= neededSpace) || -1;
};
