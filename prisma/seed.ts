import { PrismaClient, AppointmentStatus, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const profileId = "11111111-1111-1111-1111-111111111111";

  await prisma.profile.upsert({
    where: { id: profileId },
    update: {},
    create: {
      id: profileId,
      email: "admin@centroestetico.it",
      role: Role.ADMIN,
      staffMember: {
        create: {
          displayName: "Martina Rossi"
        }
      }
    }
  });

  await prisma.client.createMany({
    data: [
      {
        fullName: "Chiara Bianchi",
        phone: "+39 333 1234567",
        email: "chiara.bianchi@email.it",
        notes: "Preferisce appuntamenti serali"
      },
      {
        fullName: "Elisa Verdi",
        phone: "+39 347 9876543",
        email: "elisa.verdi@email.it",
        notes: "Allergia a prodotti con profumazione intensa"
      }
    ],
    skipDuplicates: true
  });

  await prisma.service.createMany({
    data: [
      { name: "Pulizia viso", durationMin: 60, priceCents: 5500 },
      { name: "Manicure semipermanente", durationMin: 45, priceCents: 3000 }
    ],
    skipDuplicates: true
  });

  const [firstClient] = await prisma.client.findMany({ take: 1, orderBy: { createdAt: "asc" } });
  const [firstService] = await prisma.service.findMany({ take: 1, orderBy: { createdAt: "asc" } });
  const firstStaff = await prisma.staffMember.findFirst({ orderBy: { createdAt: "asc" } });

  if (firstClient && firstService && firstStaff) {
    const startAt = new Date();
    startAt.setHours(startAt.getHours() + 2, 0, 0, 0);

    const endAt = new Date(startAt.getTime() + firstService.durationMin * 60 * 1000);

    await prisma.appointment.create({
      data: {
        clientId: firstClient.id,
        serviceId: firstService.id,
        staffMemberId: firstStaff.id,
        startAt,
        endAt,
        priceCents: firstService.priceCents,
        status: AppointmentStatus.SCHEDULED,
        notes: "Prima seduta dimostrativa"
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
