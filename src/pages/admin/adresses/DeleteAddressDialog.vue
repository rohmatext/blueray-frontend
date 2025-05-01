<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import axios from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';
import { Address } from '@/types/address';
import { ref, watch } from 'vue';

const auth = useAuthStore();
const address = defineModel<Address>();
const open = ref<boolean>(!!address.value);
const isLoading = ref<boolean>(false);

const emit = defineEmits<{
    onSuccess: [message: string];
    onError: [message: string];
}>();

const onOpenChange = (value: boolean) => {
    if (!value) {
        address.value = undefined;
    }
};

const confirmDelete = () => {
    if (!address.value) return;

    isLoading.value = true;
    axios
        .delete(`/api/addresses/${address.value.id}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        .then((res) => {
            emit('onSuccess', res.data.message);
        })
        .catch((err) => {
            if (err.response.status !== 403) throw err;

            emit('onError', err.response.data.message);
        })
        .finally(() => {
            address.value = undefined;
            isLoading.value = false;
        });
};

watch(address, () => {
    open.value = !!address.value;
});
</script>

<template>
    <Dialog v-model:open="open" @update:open="onOpenChange">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                <p>Apakah anda yakin ingin menghapus data ini?</p>
            </DialogDescription>
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="secondary">Tutup</Button>
                </DialogClose>
                <Button variant="destructive" @click="confirmDelete">Hapus</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
