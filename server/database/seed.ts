import { prisma } from './client';

async function main() {
  await prisma.column.create({
    data: {
      title: '上层框架最佳选择: Nuxt',
      cover: 'column-nuxt.png',
      desc: '上层框架最佳选择：Nuxt',
      content: `开箱即用的开发环境...`,
    },
  });
  await prisma.course.create({
    data: {
      title: 'Nuxt全栈开发',
      cover: 'course-nuxt.png',
      desc: '这门课我会全面讲解。。。',
      oPrice: 129,
      price: 99,
      detail: `这门课程共分五个模块：。。。`,
      catalogue: {
        createMany: {
          data: [
            { title: '01开篇：课程介绍和安排', source: 'https://juejin.cn/video/7202149403342143520/section/7202885295820242947' },
            { title: '02上层框架最佳选择', source: 'https://juejin.cn/video/7202149403342143520/section/7202885295820242947' },
            { title: '03五种渲染模式', source: 'https://juejin.cn/video/7202149403342143520/section/7202885295820242947' },
            { title: '04快速创建首个nuxt项目', source: 'https://juejin.cn/video/7202149403342143520/section/7202885295820242947' },
          ],
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
