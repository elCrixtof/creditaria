import asyncio
import random

async def auditoria ():
    retraso = random.randint(1, 3)
    await asyncio.sleep(retraso)
    fallo = random.randint(1, 100)
    if fallo < 10:
        raise Exception("Auditoria fallo")
    print("Auditoria exitosa")
        